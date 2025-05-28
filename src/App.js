import React from 'react'
import { Router, Route, useHistory } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import SectionNavigation from './components/SectionNavigation.js'
import history from './utils/history.js'
import { Tabs } from "antd";
import {
    UserOutlined,
    SafetyOutlined,
    TeamOutlined,
} from "@ant-design/icons";


const { TabPane } = Tabs;
/**
 * Main Component
 * @class
 */

const App = () => {
    let myHistory = useHistory()
    const handleTabChange = (key) => {
        switch (key) {
            case 'users':
                history.push("/users");
                break;
            case 'roles':
                history.push("/user-roles");
                break;
            case 'groups':
                history.push("/user-groups");
                break;
            default:
                history.push("/users");
        }
    }
    return (
        <Router history={history} hashType={'noslash'}>
            <QueryParamProvider ReactRouterRoute={Route}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    height: '100%'
                }}>
                    <Tabs
                        defaultActiveKey="users"
                        onChange={handleTabChange}
                        tabBarGutter={10}
                        size="large"
                        type='card'
                        tabBarStyle={{ marginBottom: 16 }}
                    >
                        <TabPane
                            tab={
                                <span>
                                    <UserOutlined />
                                    Users
                                </span>
                            }
                            key="users"
                        >
                        </TabPane>


                        <TabPane
                            tab={
                                <span>
                                    <SafetyOutlined />
                                    User Roles
                                </span>
                            }
                            key="roles"
                        >
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <TeamOutlined />
                                    User Groups
                                </span>
                            }
                            key="groups"
                        >
                        </TabPane>
                    </Tabs>
                    <div style={{
                        flexGrow: 1,
                        minHeight: 0,
                        overflowY: 'auto'
                    }}>
                        <SectionNavigation />
                    </div>

                </div>

            </QueryParamProvider>
        </Router>
    )
}




export default App
