// Implementar un DTO (CreateTaskDto) con validaciones (class-validator / class-transformer) que defina únicamente las propiedades permitidas para crear una tarea según su colección (title, description, completed, userId).
// Configurar el ValidationPipe global en el punto de arranque de la aplicación para que filtre y rechace (400 Bad Request) cualquier petición que incluya propiedades no autorizadas.
// Ajustar la configuración del esquema de tareas en Mongoose para que sea estricto y nunca almacene atributos fuera del modelo definido.

import { Transform } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title: string = '';
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description: string = '';
  @IsBoolean()
  completed: boolean = false;
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  userId: string = '';
}
