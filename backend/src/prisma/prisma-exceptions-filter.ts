import { ArgumentsHost, ExceptionFilter, HttpStatus, Catch } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002':
        let target = Array.isArray(exception.meta?.target)
          ? exception.meta.target[0]
          : exception.meta?.target?.toString() ?? 'value';
        if(target.toLowerCase()==='primary') target='username';
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `This ${target.toLowerCase()} is already registered.`,
          error: 'Conflict',
        });
      case 'P2012':
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Missing required field: ${exception.message}`,
          error: 'Bad Request',
        });
      case 'P2025':
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Record not found: ${exception.message}`,
          error: 'Not Found',
        });
      default:
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: exception.message,
          error: 'Bad Request',
        });
    }
  }
}
