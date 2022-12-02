import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer';

export function Serialize<T>(entity: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(entity));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private entity: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.entity, data);
      }),
    );
  }
}
