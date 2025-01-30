import { Companies } from "./axios.instance";





export const CompaniesDatabaseApi = async (token) => {
   try {
      const response = await Companies.get("/database/", {
         headers: {
            Authorization: `Baerer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

  /* {
      admin: [
        {
          id: 1,
          name: "Tech Innovators",
          avatar: "https://via.placeholder.com/50",
          specialize: "Software Development",
          business_type: "IT",
          isAccountValid: true,
        },
        {
          id: 2,
          name: "Green Energy Solutions",
          avatar: "https://via.placeholder.com/50",
          specialize: "Renewable Energy",
          business_type: "Energy",
          isAccountValid: false,
        },
      ],
      employee: [
        {
          id: 3,
          name: "Creative Designs",
          avatar: "https://via.placeholder.com/50",
          specialize: "Graphic Design",
          business_type: "Creative",
          isAccountValid: true,
        },
        {
          id: 4,
          name: "Health Plus",
          avatar: "https://via.placeholder.com/50",
          specialize: "Healthcare",
          business_type: "Medical",
          isAccountValid: true,
        },
      ],
  } */