import axios from "axios";
import api from "../hooks/axios.interceptor";

const dummy = [
  {
    id: "STU001",
    name: "Emma Thompson",
    class: "10-A",
    rollNo: "001",
    contact: "+1 234-567-8901",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "STU002",
    name: "Liam Johnson",
    class: "10-A",
    rollNo: "002",
    contact: "+1 234-567-8902",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    id: "STU003",
    name: "Sophia Martinez",
    class: "9-B",
    rollNo: "015",
    contact: "+1 234-567-8903",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: "STU004",
    name: "Noah Williams",
    class: "11-C",
    rollNo: "008",
    contact: "+1 234-567-8904",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: "STU001",
    name: "Emma Thompson",
    class: "10-A",
    rollNo: "001",
    contact: "+1 234-567-8901",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "STU002",
    name: "Liam Johnson",
    class: "10-A",
    rollNo: "002",
    contact: "+1 234-567-8902",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    id: "STU003",
    name: "Sophia Martinez",
    class: "9-B",
    rollNo: "015",
    contact: "+1 234-567-8903",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: "STU004",
    name: "Noah Williams",
    class: "11-C",
    rollNo: "008",
    contact: "+1 234-567-8904",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: "STU005",
    name: "Olivia Brown",
    class: "10-B",
    rollNo: "012",
    contact: "+1 234-567-8905",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: "STU003",
    name: "Sophia Martinez",
    class: "9-B",
    rollNo: "015",
    contact: "+1 234-567-8903",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: "STU004",
    name: "Noah Williams",
    class: "11-C",
    rollNo: "008",
    contact: "+1 234-567-8904",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: "STU005",
    name: "Olivia Brown",
    class: "10-B",
    rollNo: "012",
    contact: "+1 234-567-8905",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: "STU006",
    name: "Ethan Davis",
    class: "9-A",
    rollNo: "004",
    contact: "+1 234-567-8906",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    id: "STU004",
    name: "Noah Williams",
    class: "11-C",
    rollNo: "008",
    contact: "+1 234-567-8904",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: "STU005",
    name: "Olivia Brown",
    class: "10-B",
    rollNo: "012",
    contact: "+1 234-567-8905",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: "STU006",
    name: "Ethan Davis",
    class: "9-A",
    rollNo: "004",
    contact: "+1 234-567-8906",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    id: "STU004",
    name: "Noah Williams",
    class: "11-C",
    rollNo: "008",
    contact: "+1 234-567-8904",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: "STU005",
    name: "Olivia Brown",
    class: "10-B",
    rollNo: "012",
    contact: "+1 234-567-8905",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: "STU006",
    name: "Ethan Davis",
    class: "9-A",
    rollNo: "004",
    contact: "+1 234-567-8906",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
];

export const getManagementStats = async (entity: string) => {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${entity.toLowerCase()}/stats`
  );
  return response.data;
};

export const getManagementList = async (
  entity: string,
  page = 1,
  limit = 10,
  filters: Record<string, string | object> = {},
) => {
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${entity.toLowerCase()}/getAll`,
    {
      params: {
        page,
        limit,
        ...filters,
      },
    },
  );

  return res.data.data;
};

// export const getManagementList = async (
//   entity: string,
//   page = 1,
//   limit = 10,
//   filters: Record<string, any> = {}
// ) => {
//   await new Promise((res) => setTimeout(res, 300));

//   return {
//     data: dummy.slice((page - 1) * limit, page * limit),
//     total: dummy.length,
//   };
// };
