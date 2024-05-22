export interface ProductResponse {
    count: number;
    next: string;
    previous: string;
    results: HttpData[]
  }

export interface HttpData {
    name: string,
    img: string,
    text: string,
    price: string,
    brand: string,
    description: string
}

