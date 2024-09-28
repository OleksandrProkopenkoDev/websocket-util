import React, {FC, useEffect, useState} from 'react';
import {Button, Dropdown, MenuProps, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";

export const THEMES = {
    LIGHT_THEME : "light-theme",
    DARK_BLUE_THEME : "dark-blue-theme"
}

interface IThemesOption {
    setTheme : any
}

const ThemesOption:FC<IThemesOption> = ({setTheme}) => {


    const items: MenuProps['items'] = [
        {
            label: "Dark blue",
            key: THEMES.DARK_BLUE_THEME,
        },
        {
            label: "White",
            key: THEMES.LIGHT_THEME,
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e.key);
        setTheme(e.key)
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps} trigger={['click']}>
            <Button>
                <Space>
                    Theme
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default ThemesOption;