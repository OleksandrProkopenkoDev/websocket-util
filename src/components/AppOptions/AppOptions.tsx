import React, {FC} from 'react';
import {ConfigProvider} from "antd";
import ImportData from "./ImportData/ImportData.tsx";
import ExportData from "./ExportData/ExportData.tsx";
import AboutModal from "./AboutModal/AboutModal.tsx";
import ThemesOption from "./ThemesOption/ThemesOption.tsx";

interface IAppOptions {
    setTheme : any
}

const AppOptions:FC<IAppOptions> = ({setTheme}) => {
    return (
        <ConfigProvider theme={{
            components: {
                Button : {
                    colorBgContainer: 'var(--button-bg-disabled)',
                    colorText : "var(--text-color)"
                }}
        }}>
            <ImportData/>
            <ExportData/>
            <AboutModal/>
            <ThemesOption setTheme={setTheme}/>
        </ConfigProvider>
    );
};

export default AppOptions;