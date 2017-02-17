import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import {makeStore} from "../lib/store";
import provide from "../lib/provide";

export default provide(makeStore)(() => (
    <Layout title="Other">
        <h2>Other</h2>
        <nav>
            <Link href="/"><a>Navigate to index</a></Link>
        </nav>
    </Layout>
));
