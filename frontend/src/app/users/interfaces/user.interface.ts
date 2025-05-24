export class User {
	lastName!: string;
	firstName! : string;
	email!: string;
	password! : string;
	role? : string;

    static assign(data: any): User {
        return Object.assign(new User(), data);
    }
    
}
