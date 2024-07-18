import Image from "next/image";
import React from "react";
import { Button } from "antd";

const Home = () => (
    <div className="App">
        <Button type="primary">Button</Button>
        <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
    </div>
);

export default Home;
