import {z} from 'zod';
import {APIGatewayProxyEvent} from 'aws-lambda';

function handleOptionsCall(event: APIGatewayProxyEvent) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
            body: JSON.stringify({message: 'CORS preflight response'}),
        };
    } else {
        return null;
    }
}

function validateBearerToken(authHeader: string | undefined) {
    if (!process.env.BEARER_TOKEN || process.env.BEARER_TOKEN.trim() === '') {
        throw new Error('Bearer token is not set or empty in environment variables');
    }

    const bearerToken: string = process.env.BEARER_TOKEN;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== bearerToken) {
        return createResponse(
            401,
            'Unauthorized: Invalid or missing Bearer token in Authorization header'
        );
    }

    return null;
}

function createResponse(statusCode: number, body: string | object) {
    return {
        statusCode,
        body: typeof body === 'string' ? body : JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
}

function handleErrors(description: string, error: any) {
    console.error(`${description}:`, error);
    return createResponse(500, `Error: ${error.message}`);
}

function getAndParseBody(event: APIGatewayProxyEvent) {
    return event.body ? JSON.parse(event.body) : event;
}

type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

function validateBody(body: Record<string, any>, requiredFields: string[]): ValidationResult {
    const errors: string[] = [];

    requiredFields.forEach(field => {
        if (!body.hasOwnProperty(field)) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}

export const helloWorld = async (event: APIGatewayProxyEvent) => {
    const options = handleOptionsCall(event);
    if (options) return options;

    const bearerTokenValidationResult = validateBearerToken(
        event.headers && event.headers.Authorization
    );
    if (bearerTokenValidationResult) return bearerTokenValidationResult;

    const body = getAndParseBody(event);

    return 'hello world';
};