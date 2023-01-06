import React from 'react'
import { StarOutlined } from '@ant-design/icons';

function Rating() {

    return (
        <div>
            <div style = {{ width: '99%', margin: '1rem auto'}}>
                <h3>Best Movie</h3><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                <h3>Fun</h3><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                <h3>Touching</h3><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                <h3>Sad</h3><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                <h3>Watch Again</h3><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
            </div>
        </div>
    )
}

export default Rating