import { useState } from "react";
import { useAsync, useFetchAndLoad } from "../hooks";
import { getCoolMorty, getCoolRick } from "../services/public.service";

const Component1 = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [morty, setMorty] = useState(null);
    const getApiData = async () => await callEndpoint(getCoolMorty());

    const adaptMorty = (data: any) => {
        setMorty(data.name);
    };

    useAsync(getApiData, adaptMorty, () => {});
    return <div>{loading ? "LOADING" : morty}</div>;
};

function Component2() {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [rick, setRick] = useState(null);

    const getApiData = async () => await callEndpoint(getCoolRick());

    const adaptRick = (data: any) => {
        setRick(data.name);
    };

    useAsync(getApiData, adaptRick, () => {}, []);
    return <div>{loading ? "LOADING" : rick}</div>;
}

export const DashboardSuperFix = () => {
    return (
        <div style={{ fontSize: "3rem" }}>
            <div role="tabpanel"> {<Component1 />}</div>
            <div role="tabpanel"> {<Component2 />}</div>
        </div>
    );
};

export default DashboardSuperFix;
