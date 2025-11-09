import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Sentiment {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export class CommentDto {
  @IsEnum(Sentiment, { message: 'Sentiment must be positive or negative' })
  sentiment: Sentiment;

  @IsNotEmpty()
  @IsString()
  content: string;
}
