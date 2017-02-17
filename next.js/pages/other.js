import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default () => {
    return (
        <Layout title="Other">
            <h2>Other</h2>
            <nav>
                <Link href="/"><a>Navigate to index</a></Link>
            </nav>
        </Layout>
    )
};
