import Test from "@/api/test"


const Admin = () => {
    const test = Test({params: { user:'tester'}});
    console.log(test)
    return <><div>
        Admin Page</div></>;
}

export default Admin;