import {
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class AddTaskDTO {
  @MinLength(6)
  public title: string;

  @IsNotEmpty()
  public description: string;

  @Min(2020)
  @Max(2030)
  public year: number;

  @IsString()
  @IsIn(['todo', 'done', 'in progress'])
  public statut: string;
}
