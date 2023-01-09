import React from 'react'
import { Input } from 'antd';

const { TextArea } = Input;

function Content() {
    return (
        <div>
            <h4>one-line</h4>
            <TextArea id='one-line' rows={4} placeholder="한줄평을 적어주세요." maxLength={50}/>
            <br />
            <br />
            <h4>detail</h4>
            <TextArea id='detail' rows={4} placeholder="상세 리뷰를 적어주세요."/>
        </div>
    )
}

export default Content