import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    FormOutlined,
    DownloadOutlined,
    FileTextOutlined,
    AreaChartOutlined,
    MonitorOutlined,
    ImportOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    BarsOutlined,
    MenuOutlined,
    CarOutlined
} from '@ant-design/icons';
import { useDataQuery } from '@dhis2/app-runtime';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Layout, Menu, Dropdown, Avatar } from 'antd';
import React, { useState } from 'react';
import classes from './App.module.css';
import AppWrapper from './AppWrapper.js';

const { Sider, Content } = Layout;

const ME_QUERY = {
    me: {
        resource: 'me',
        params: {
            fields: ['firstName', 'surname', 'email'],
        },
    },
};

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(['5']);
    const { loading, error, data } = useDataQuery(ME_QUERY);

    if (loading || error) return null;

    const { firstName, surname, email: userEmail } = data.me;
    const fullName = `${firstName} ${surname}`;
    const initials = `${firstName?.[0] || ''}${surname?.[0] || ''}`;

    const profileMenu = (
        <Menu>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <a href="/sims-web-user-profile/#/profile">Settings</a>
            </Menu.Item>
            <Menu.Item key="account" icon={<UserOutlined />}>
                <a href="/sims-web-user-profile/#/account">Account</a>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <a href="/dhis-web-commons-security/logout.action">Logout</a>
            </Menu.Item>
        </Menu>
    );

    const dataCreationItems = [
        { key: '2.1', icon: <BarsOutlined />, label: <a href="/sims-web-maintenance/#/list/organisationUnitSection/organisationUnit">Organisation Units</a> },
        { key: '2.2', icon: <BarsOutlined />, label: <a href="/sims-web-maintenance/#/list/programSection/program">Programs</a> },
        { key: '2.3', icon: <BarsOutlined />, label: <a href="/sims-web-maintenance/#/list/dataElementSection/dataElement">Data Elements</a> },
        { key: '2.4', icon: <BarsOutlined />, label: <a href="/sims-web-maintenance/#/list/dataSetSection/dataSet">Data Sets</a> },
    ];

    const dataCollectionItems = [
        { key: '3.1', icon: <FormOutlined />, label: <a href="/sims-web-capture/">Forms</a> },
        { key: '3.2', icon: <FileTextOutlined />, label: <a href="/sims-web-aggregate-data-entry/">Spreadsheets</a> },
        { key: '3.3', icon: <DownloadOutlined />, label: <a href="/sims-web-import-export/">Data Import & Export</a> },
    ];

    const adminCentreItems = [
        { key: '5.1', icon: <TeamOutlined />, label: <a href="/sims-web-user/">User Management</a> },
        { key: '5.2', icon: <SettingOutlined />, label: <a href="/sims-web-settings/">System Settings</a> },
    ];

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    return (
        <Layout style={{ height: '100vh' }}>
        <Sider
                trigger={null}
                collapsible
                width="20%"
                collapsedWidth={80}
                collapsed={collapsed}
                onCollapse={(collapsedState) => setCollapsed(collapsedState)}
                breakpoint="lg" 
                onBreakpoint={(broken) => setCollapsed(broken)} 
                className={classes.sidebar}
                style={{
                    padding: '10px 0',
                    transition: 'width 0.2s',
                    background: '#003D8F',
                    borderRight: '1px solid #d9d9d9',
                    overflow: 'hidden',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#003D8F',
                    height: '100%',
                }}>
                    {/* Top Section */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',

                        flexShrink: 0
                    }}>
                        <div className={classes.logo} style={{
                            flexDirection: collapsed && 'column-reverse',

                        }}>
                            <Button
                                type="text"
                                className=''
                                icon={<MenuOutlined fontSize="medium" />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    color: '#fff',
                                }}
                            />
                            <div>
                                <img
                                    src={process.env.PUBLIC_URL + "/sims-sidebar-logo.png"}
                                    alt="SIMS"
                                    style={{
                                        width: collapsed ? '30px' : '40px',
                                        height: collapsed ? '30px' : '40px',
                                        objectFit: 'cover',
                                        transition: 'all 0.2s',
                                        filter: "brightness(0) invert(1)"
                                    }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Scrollable Menu Section */}
                    <div style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}>
                        <Menu
                            selectedKeys={'5.1'}
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={{
                                height: '100%',
                                overflowY:'auto'
                            }}
                            className={classes.menu} // Apply the custom styles from the CSS module
                            mode="inline"
                            inlineCollapsed={collapsed}
                        >
                            <Menu.Item key="1" icon={<MonitorOutlined />}>
                                <a href="/sims-web-usage-analytics/" >Overview</a>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'2'}
                                icon={<CheckCircleOutlined />}
                                title="Activation"
                            >
                                {dataCreationItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'3'}
                                icon={<ImportOutlined />}
                                title="Data Collection"
                            >
                                {dataCollectionItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}

                            </Menu.SubMenu>

                            <Menu.Divider />

                            <Menu.Item key="4" icon={<AreaChartOutlined />}>
                                <a href="/sims-web-dashboard/" >Visualization</a>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'5'}
                                icon={<UserOutlined />}
                                title="Admin Centre"
                                style={{
                                    marginTop: 'auto',
                                }}
                            >
                                {adminCentreItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </Menu>
                    </div>

                    {/* Modern Profile Section */}
                    <div>
                        {profileMenu}
                    </div>
                </div>
            </Sider>

            <Layout>
                <div className={classes.titBar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <TeamOutlined style={{ fontSize: 24, color: '#5DA9E9' }} />
                        <h2 className={classes.heading}>User Management</h2>
                    </div>
                    <p style={{ fontSize: '14px', marginTop: 4, color: '#606060' }}>
                        Manage users, groups, roles, and system permissions.
                    </p>
                </div>

                <Content className={classes.container}>
                    <AppWrapper />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
