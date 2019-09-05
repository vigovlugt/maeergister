import { NextApiResponse, NextApiRequest } from "next";
import getConnection from "../../src/server/database";
import { RowDataPacket } from "mysql2/promise";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const con = await getConnection();
        const {sql} = JSON.parse(req.body);
        console.log(sql)
        const [results,tableInfo] = await con.query<RowDataPacket[]>(sql,[]);

        res.json(results)
    }
    catch (error){
        console.error(error)
        return {error}
    }

}