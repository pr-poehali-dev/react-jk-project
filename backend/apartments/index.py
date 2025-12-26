import json
import os
import psycopg2
import jwt

def handler(event: dict, context) -> dict:
    '''API для работы с квартирами и бронированиями'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        if method == 'GET':
            rooms_filter = event.get('queryStringParameters', {}).get('rooms') if event.get('queryStringParameters') else None
            
            if rooms_filter and rooms_filter != 'all':
                cur.execute(
                    "SELECT id, rooms, area, floor, price, image_url, status FROM apartments WHERE rooms = %s ORDER BY price",
                    (int(rooms_filter),)
                )
            else:
                cur.execute("SELECT id, rooms, area, floor, price, image_url, status FROM apartments ORDER BY price")
            
            apartments = cur.fetchall()
            result = [
                {
                    'id': apt[0],
                    'rooms': apt[1],
                    'area': float(apt[2]),
                    'floor': apt[3],
                    'price': apt[4],
                    'image': apt[5],
                    'status': apt[6]
                }
                for apt in apartments
            ]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token')
            if not token:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            try:
                payload = jwt.decode(token, 'secret_key_change_in_production', algorithms=['HS256'])
                user_id = payload['user_id']
            except jwt.ExpiredSignatureError:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Токен истек'}),
                    'isBase64Encoded': False
                }
            except jwt.InvalidTokenError:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный токен'}),
                    'isBase64Encoded': False
                }
            
            body = json.loads(event.get('body', '{}'))
            apartment_id = body.get('apartment_id')
            comment = body.get('comment', '')
            
            if not apartment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Укажите ID квартиры'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "INSERT INTO bookings (user_id, apartment_id, comment) VALUES (%s, %s, %s) RETURNING id",
                (user_id, apartment_id, comment)
            )
            booking_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'booking_id': booking_id}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
