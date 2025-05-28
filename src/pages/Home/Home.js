import i18n from '@dhis2/d2-i18n'
import { IconAdd16, IconList16 } from '@dhis2/ui'
import React from 'react'
import { useCurrentUser } from '../../hooks/useCurrentUser.js'
import styles from './Home.module.css'
import SectionCard from './SectionCard.js'
import { Card, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Link } from 'react-router-dom';

const getActions = (path, canCreate) => {
    const listAction = {
        label: i18n.t('List'),
        icon: IconList16,
        to: path,
    }
    const addAction = {
        label: i18n.t('Add'),
        icon: IconAdd16,
        to: `${path}/new`,
    }
    return canCreate ? [addAction, listAction] : [listAction]
}

const Home = () => {
    const {
        hasUserSectionAccess,
        hasRoleSectionAccess,
        hasGroupSectionAccess,
        canCreateUsers,
        canCreateGroups,
        canCreateRoles,
    } = useCurrentUser()

    return (
        <div className={styles.grid}>
            {hasUserSectionAccess && (
                <Link underline='none' to='/users'>
                    <Card className={styles.card} elevation={0} sx={{
                        borderRadius: 5,
                        backgroundColor: 'var(--colors-grey100)',
                        border: '1px solid #D7D7D7'
                    }}>
                        <CardContent className={styles.container}>
                            <h2 className={styles.title}>Users</h2>
                            <p className={styles.body}>Create, modify, view and delete Users</p>
                            <AvatarGroup spacing="small" sx={{
                                '& .MuiAvatar-root': { 
                                    width: 24,
                                    height: 24,
                                    fontSize: 14
                                },}}>                                                                                                               
                                <Avatar/>
                                <Avatar/>
                                <Avatar/>
                                <Avatar/>
                            </AvatarGroup>
                        </CardContent>
                    </Card>
                </Link>
            )}
            {hasRoleSectionAccess && (
                <Link underline='none' to='/user-roles'>
                    <SectionCard
                    titleText={i18n.t('User roles')}
                        bodyText={i18n.t(
                            'Create, modify, view and delete User Roles'
                        )}
                        actions={getActions('/user-roles', canCreateGroups)}
                    />
                </Link>
            )}
            {hasGroupSectionAccess && (
                <Link underline='none' to='/user-groups'>
                    <SectionCard
                        titleText={i18n.t('User groups')}
                        bodyText={i18n.t(
                            'Create, modify, view and delete User Groups'
                        )}
                        actions={getActions('/user-groups', canCreateRoles)}
                    />
                </Link>
            )}
        </div>
    )
}

export default Home
