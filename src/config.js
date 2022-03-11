export const PG = {
	// connection: 'postgres://glgkmnbe:QVV6N8gJwdQnmiAW5mhR2648LFYy19Jk@chunee.db.elephantsql.com/glgkmnbe'
	connection: 'postgres://postgres:baxtiyor@localhost:5432/izma',
	// connection: 'postgres://viumjdfr:zQRUk0QkCFubIOCyfuKK0js8YDhitk9M@ziggy.db.elephantsql.com:5432/viumjdfr'
}

export const FETCH = {
	user: 2,
	post: 10,
}

export const JWT = {
	SECRET: 'SECRET',
	EXPIRES_IN: 7200 * 12 * 7,
}

export const chooseRole = (status) => {
	if(status == 1) return 'CEO' 
	if(status == 2) return 'Marketer' 
	if(status == 3) return 'Adminstrator' 
	if(status == 4) return 'Casher' 
	if(status == 5) return 'Teacher' 
} 
