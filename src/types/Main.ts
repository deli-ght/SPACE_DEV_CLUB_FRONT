export interface Main {
  name: string;
  born: string;
  died: string;
  bio: {
    text: string;
    url: string;
  };
  id: number;
}

export interface CardProps {
  imageUrl: string,
  postTitle: string,
  postDesc: string,
  tags: string[],
  date: number,
  comment: number
}

export interface DetailCardProps {
  margin: string
  padding: string
  imageUrl?: string,
  postIdx: number, 
  postTitle: string,
  postDesc: string,
  date: string
}