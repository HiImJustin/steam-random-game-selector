import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";

//Gets a list of owned steam games based on steam id
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(
        "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=B7D55D86C23A7C4D2881D1E8BEE6885D&steamid=76561198142254362&format=json"
    );
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}

export default function Home({ data }) {
    // console.log(data.response.games);

    const [userInfo, setUserInfo] = useState([]);
    const [userGames, setUserGames] = useState([]);

    // useEffect(() => {
    //     fetch("/api/hello")
    //         .then((res) => res.json())
    //         .then((user) => {
    //             console.log(user);
    //             setUserInfo((prevState) => user);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    // useEffect(() => {
    //     fetch("/api/getGames")
    //         .then((res) => res.json())
    //         .then((user) => {
    //             setUserGames((prevState) => user);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    console.log(userGames);
    const [steamId, setSteamId] = useState({
        steamId: "",
    });
    function steamIdValue(e) {
        setSteamId(e.target.value);
        console.log(steamId);
    }
    function submitData(e) {
        e.preventDefault();
        fetch("/api/getGames", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(steamId),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("steam data retrieved");
                setUserGames(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const array = userInfo.map((item, i) => (
        <div key={i}>
            <div>{item.personaname}</div>
            <Image
                src="https://avatars.akamai.steamstatic.com/d8ed4899053e5bbc31e56dbbc7f5675e25049190_full.jpg"
                alt="Vercel Logo"
                width={100}
                height={88}
            />
        </div>
    ));
    const gamesArray = userGames.map((item, i) => (
        <div key={i}>
            <div>
                {item.name} {item.playtime_forever} Minutes played
            </div>
        </div>
    ));

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                {array}
                {gamesArray}
                <input
                    type={"number"}
                    name="steamId"
                    value={steamId}
                    onChange={steamIdValue}
                ></input>
                <submit onClick={submitData}>submit</submit>
            </main>
        </div>
    );
}
