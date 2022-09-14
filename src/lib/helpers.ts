export function templateLambdaArn({ name }: { name: string }) {
    return `arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:${name}`
}
