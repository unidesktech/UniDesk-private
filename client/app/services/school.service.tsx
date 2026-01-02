import axios from "axios"

export const isValidSchoolCode = async(schoolCode: string) => {
   const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/school/validate-code/${schoolCode}`)

   return data.data;
}