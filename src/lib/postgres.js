import { Pool } from 'pg'
import { PG } from '@config'
const pool = new Pool({ connectionString: PG.connection, })

export const fetch = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows: [row] } = await client.query(SQL, params.length ? params : null)
		return row
	}
	finally {
		client.release()
	}
}

export const fetchAll = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(SQL, params.length ? params : null)
		return rows
	}
	finally {
		client.release()
	}
}