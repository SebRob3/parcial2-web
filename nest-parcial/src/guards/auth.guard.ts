import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apikey = request.headers['x-api-key'];
        const validKey = '12345';
        if (apikey !== validKey) {
            throw new ForbiddenException('Invalid or missing API key');
        }
        return true;
    }
}