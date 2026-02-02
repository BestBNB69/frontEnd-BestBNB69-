export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginBackDto {
    EmailAddress: string;
    PasswordHash: string;
}

export interface RegisterDto {
    username: string;
    email: string;
    password: string;
}

export interface RegisterBackDto {
    Name: string;
    EmailAddress: string;
    PasswordHash: string;
}