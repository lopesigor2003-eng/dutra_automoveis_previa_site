export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  content: string;
  vehiclePurchased?: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    authorName: 'Carlos Eduardo Silveira',
    role: 'Cliente Comprador',
    location: 'Santa Maria - RS',
    rating: 5,
    date: 'Avaliação no Google Maps · Há 2 semanas',
    content:
      'Experiência sensacional com a Dutra Automóveis! Comprei um Corolla 2023 impecável. O atendimento na loja da Serafim Valandro foi transparente do início ao fim, sem enrolação. O carro foi entregue revisado, polido e com a documentação 100% pronta. Recomendo de olhos fechados!',
    vehiclePurchased: 'Toyota Corolla XEi',
  },
  {
    id: 'test-2',
    authorName: 'Mariana Baccin',
    role: 'Cliente Venda / Troca',
    location: 'Santa Maria - RS',
    rating: 5,
    date: 'Avaliação no Google Maps · Há 1 mês',
    content:
      'Vendi meu carro usado e peguei um Compass na Dutra. Fiquei muito surpresa com a valorização justa do meu veículo na troca, muito superior a outras lojas da cidade. Negociação ágil, equipe atenciosa e honesta. Dá gosto fazer negócio assim!',
    vehiclePurchased: 'Jeep Compass Longitude',
  },
  {
    id: 'test-3',
    authorName: 'Rodrigo Dalla Porta',
    role: 'Cliente Financiamento',
    location: 'Camobi, Santa Maria - RS',
    rating: 5,
    date: 'Avaliação no Google Maps · Há 2 meses',
    content:
      'Excelente concessionária! Aprovaram meu financiamento em poucas horas com uma taxa muito justa pelo Santander. O pós-venda é diferenciado: me deram todo o suporte necessário após a compra. Carros de procedência garantida.',
    vehiclePurchased: 'Volkswagen T-Cross Highline',
  },
  {
    id: 'test-4',
    authorName: 'Fernanda Meneghetti',
    role: 'Cliente Compradora',
    location: 'Santa Maria - RS',
    rating: 5,
    date: 'Avaliação no Google Maps · Há 3 meses',
    content:
      'Procurava um carro confiável para viajar com a família e encontrei exatamente o que precisava na Dutra. O espaço da loja é aconchegante e o café é ótimo! Transparência total sobre o histórico do veículo e laudo cautelar em mãos.',
    vehiclePurchased: 'Hyundai Creta Ultimate',
  },
  {
    id: 'test-5',
    authorName: 'Lucas Zimmermann',
    role: 'Cliente Venda Direta',
    location: 'Santa Maria - RS',
    rating: 5,
    date: 'Avaliação no Google Maps · Há 4 meses',
    content:
      'Precisava vender minha picape com rapidez e segurança financeira. A Dutra avaliou o carro na hora e o pagamento caiu na minha conta no mesmo dia após a vistoria do cartório. Profissionais sérios e de muita palavra!',
    vehiclePurchased: 'Fiat Toro Volcano',
  },
];
