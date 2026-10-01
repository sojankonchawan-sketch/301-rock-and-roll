export interface Member {
  id: number;
  name: string;
  nickname?: string;
  role: string; 
  image?: string;
  
}

export interface Band {
  id: number;
  name: string;
  foundedYear: number;
  genre: string;
  image: string; 
  members: Member[];
}