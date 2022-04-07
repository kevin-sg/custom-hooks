# Custom Hooks

### Hooks - Controller Api call `useFetchAndLoad()`

```
    // hooks/useFetchAndLoad.ts

    const useFetchAndLoad = () => {
    const [loading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<any>) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);
        let result = {} as AxiosResponse<any>;
        try {
            result = await axiosCall.call;
        } catch (err: any) {
            setLoading(false);
            throw err;
        }
        setLoading(false);
        return result;
    };

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, callEndpoint };
};
```

### Hooks - Check if a component is active `useAsync()`

```
    // hooks/asyncComponentClean.hook.ts

    import { useEffect } from "react";
    import { AxiosResponse } from "axios";

    export const useAsync = (
        asyncFn: () => Promise<AxiosResponse<any, any>>,
        successFunction: Function,
        returnFunction: Function,
        dependencies: any[] = []
    ) => {
        useEffect(() => {
            let isActive = true;
            asyncFn().then((result) => {
                if (isActive) successFunction(result.data);
            });
            return () => {
                returnFunction && returnFunction();
                isActive = false;
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, dependencies);
    };

```

### Usage Hook `useFetchAndLoad()` and `useAsync()`

```
    // usage

    const foo = () => {
    const { loading, callEndpoint } = useFetchAndLoad();

    const [morty, setMorty] = useState(null);

    const getApiData = async () => await callEndpoint(getCoolMorty());

    const adaptMorty = (data: any) => {
        setMorty(data.name);
    };

    useAsync(getApiData, adaptMorty, () => {});
    }

```
