import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [apartmentPrice, setApartmentPrice] = useState(5000000);
  const [initialPayment, setInitialPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(15);
  const [interestRate] = useState(12);
  
  const [selectedRooms, setSelectedRooms] = useState<string>('all');

  const calculateMortgage = () => {
    const loanAmount = apartmentPrice - (apartmentPrice * initialPayment) / 100;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(monthlyPayment);
  };

  const apartments = [
    { id: 1, rooms: 1, area: 38, floor: 5, price: 4200000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
    { id: 2, rooms: 2, area: 52, floor: 8, price: 5800000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
    { id: 3, rooms: 2, area: 58, floor: 12, price: 6400000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
    { id: 4, rooms: 3, area: 72, floor: 10, price: 7900000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
    { id: 5, rooms: 3, area: 85, floor: 15, price: 9200000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
    { id: 6, rooms: 4, area: 105, floor: 18, price: 11500000, image: 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg' },
  ];

  const filteredApartments = selectedRooms === 'all' 
    ? apartments 
    : apartments.filter(apt => apt.rooms.toString() === selectedRooms);

  const infrastructure = [
    { icon: 'School', title: 'Школа', distance: '5 мин' },
    { icon: 'ShoppingCart', title: 'Супермаркет', distance: '3 мин' },
    { icon: 'Coffee', title: 'Кафе и рестораны', distance: '2 мин' },
    { icon: 'HeartPulse', title: 'Поликлиника', distance: '7 мин' },
    { icon: 'Trees', title: 'Парк', distance: '4 мин' },
    { icon: 'Dumbbell', title: 'Фитнес-центр', distance: '6 мин' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PREMIUM PARK
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#hero" className="hover:text-primary transition-colors">Главная</a>
            <a href="#about" className="hover:text-primary transition-colors">О комплексе</a>
            <a href="#apartments" className="hover:text-primary transition-colors">Квартиры</a>
            <a href="#infrastructure" className="hover:text-primary transition-colors">Инфраструктура</a>
            <a href="#calculator" className="hover:text-primary transition-colors">Калькулятор</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <Icon name="Phone" className="mr-2" size={16} />
            Позвонить
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Жизнь в центре <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">комфорта</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Современный жилой комплекс премиум-класса с развитой инфраструктурой. 
                Квартиры от 38 до 105 м² с отделкой и панорамными окнами.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Home" className="mr-2" size={20} />
                  Выбрать квартиру
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  <Icon name="Calendar" className="mr-2" size={20} />
                  Записаться на просмотр
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">250+</div>
                  <div className="text-sm text-muted-foreground">Квартир</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">22</div>
                  <div className="text-sm text-muted-foreground">Этажа</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">2025</div>
                  <div className="text-sm text-muted-foreground">Сдача</div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/57804a2d-f8d9-4e41-be3b-acfac1f9eae2.jpg"
                alt="ЖК Premium Park"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">О комплексе</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Premium Park — это воплощение современного подхода к городской жизни
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Building2', title: 'Современная архитектура', desc: 'Уникальный фасад и продуманная планировка' },
              { icon: 'Shield', title: 'Безопасность', desc: 'Видеонаблюдение и охрана 24/7' },
              { icon: 'Car', title: 'Паркинг', desc: 'Подземный паркинг с зарядкой для электромобилей' },
              { icon: 'TreePine', title: 'Экология', desc: 'Зеленый двор без машин с детскими площадками' },
            ].map((feature, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Квартиры</h2>
          <p className="text-center text-muted-foreground mb-12">
            Выберите планировку, которая подходит именно вам
          </p>
          
          <Tabs value={selectedRooms} onValueChange={setSelectedRooms} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="1">1к</TabsTrigger>
              <TabsTrigger value="2">2к</TabsTrigger>
              <TabsTrigger value="3">3к</TabsTrigger>
              <TabsTrigger value="4">4к</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApartments.map((apt) => (
              <Card key={apt.id} className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group">
                <div className="relative overflow-hidden">
                  <img 
                    src={apt.image} 
                    alt={`Квартира ${apt.rooms}-комнатная`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {apt.rooms}-комн.
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {(apt.price / 1000000).toFixed(1)} млн ₽
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round(apt.price / apt.area).toLocaleString()} ₽/м²
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{apt.area} м²</div>
                      <div className="text-sm text-muted-foreground">{apt.floor} этаж</div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Инфраструктура</h2>
          <p className="text-center text-muted-foreground mb-12">
            Все необходимое в шаговой доступности
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructure.map((item, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.distance} пешком</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Калькулятор ипотеки</h2>
          <p className="text-center text-muted-foreground mb-12">
            Рассчитайте ежемесячный платеж по ипотеке
          </p>
          
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <Label className="text-base mb-4 block">Стоимость квартиры</Label>
                    <Input 
                      type="number" 
                      value={apartmentPrice}
                      onChange={(e) => setApartmentPrice(Number(e.target.value))}
                      className="text-lg mb-3"
                    />
                    <Slider 
                      value={[apartmentPrice]} 
                      onValueChange={([val]) => setApartmentPrice(val)}
                      min={3000000}
                      max={15000000}
                      step={100000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">Первоначальный взнос: {initialPayment}%</Label>
                    <Slider 
                      value={[initialPayment]} 
                      onValueChange={([val]) => setInitialPayment(val)}
                      min={10}
                      max={50}
                      step={5}
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      {((apartmentPrice * initialPayment) / 100).toLocaleString()} ₽
                    </div>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">Срок кредита: {loanTerm} лет</Label>
                    <Slider 
                      value={[loanTerm]} 
                      onValueChange={([val]) => setLoanTerm(val)}
                      min={5}
                      max={30}
                      step={1}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Ежемесячный платеж</div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {calculateMortgage().toLocaleString()} ₽
                    </div>
                  </div>
                  
                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Сумма кредита:</span>
                      <span className="font-semibold">{(apartmentPrice - (apartmentPrice * initialPayment) / 100).toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Процентная ставка:</span>
                      <span className="font-semibold">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Срок:</span>
                      <span className="font-semibold">{loanTerm} лет</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
                    Оставить заявку
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Контакты</h2>
          <p className="text-center text-muted-foreground mb-12">
            Свяжитесь с нами любым удобным способом
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">+7 (495) 123-45-67</div>
                      <div className="text-sm text-muted-foreground">Ежедневно 9:00 — 21:00</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">info@premiumpark.ru</div>
                      <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">г. Москва, ул. Примерная, д. 1</div>
                      <div className="text-sm text-muted-foreground">Офис продаж</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Оставьте заявку</h3>
                <form className="space-y-4">
                  <div>
                    <Label>Ваше имя</Label>
                    <Input placeholder="Иван Иванов" className="mt-1" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (___) ___-__-__" className="mt-1" />
                  </div>
                  <div>
                    <Label>Комментарий</Label>
                    <Input placeholder="Интересует 2-комнатная квартира" className="mt-1" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PREMIUM PARK
          </div>
          <p className="text-white/70 mb-6">
            Современный жилой комплекс премиум-класса
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Youtube" size={20} />
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-sm text-white/50">
            © 2024 Premium Park. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
