const users = [
    {
      id: "1",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "hashed_password_123", // Placeholder for a hashed password
    },
    {
      id: "2",
      fullName: "Bob Smith",
      email: "bob.smith@example.com",
      password: "hashed_password_456",
    },
    {
      id: "3",
      fullName: "Charlie Brown",
      email: "charlie.brown@example.com",
      password: "hashed_password_789",
    },
    {
      id: "4",
      fullName: "Diana Ross",
      email: "diana.ross@example.com",
      password: "hashed_password_101",
    }
]

export const UserController = {
    GetUsers: (call: any, callback: any) => {
        try {
            callback(null, {users})
        } catch (error) {
            callback(error, null)
        }
    }
}