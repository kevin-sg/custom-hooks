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
