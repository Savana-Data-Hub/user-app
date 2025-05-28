import { Button, colors } from '@dhis2/ui'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import React from 'react'
import navigateTo from '../../utils/navigateTo.js'
import styles from './SectionCard.module.css'

const SectionCard = ({ titleText, bodyText, actions }) => (
    // <Card className={styles.card} >
    //     <div className={styles.container}>
    //         <h2 className={styles.title}>{titleText}</h2>
    //         <p className={styles.body}>{bodyText}</p>
    //     </div>
    //     <div className={styles.actions}>
    //         {actions.map(({ label, icon: Icon, to }) => (
    //             <Button
    //                 key={label}
    //                 small
    //                 icon={<Icon color={colors.grey600} />}
    //                 onClick={() => navigateTo(to)}
    //             >
    //                 {label}
    //             </Button>
    //         ))}
    //     </div>
    // </Card>
    <Card className={styles.card} elevation={0} sx={{
            borderRadius: 5,
            backgroundColor: 'var(--colors-grey100)',
            border: '1px solid #D7D7D7'
        }}>
        <CardContent className={styles.container}>
            <h2 className={styles.title}>{titleText}</h2>
            <p className={styles.body}>{bodyText}</p>
        </CardContent>
    </Card>
)

SectionCard.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType.isRequired,
            label: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    bodyText: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
}

export default SectionCard
