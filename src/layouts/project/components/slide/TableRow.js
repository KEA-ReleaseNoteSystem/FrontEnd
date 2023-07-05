import React, { useState } from 'react';

const TableRow = () => {
    const [isSliding, setSliding] = useState(false);

    const handleSlide = () => {
        setSliding(true);
    };

    const handleDelete = () => {
        // 삭제 버튼 클릭 시 실행되는 로직을 작성해주세요.
        // 행 삭제 등의 작업을 수행할 수 있습니다.
    };

    return (
        <tr className={isSliding ? 'slide-left' : ''}>
            <td>행 데이터</td>
            <td>
                <button onClick={handleDelete}>삭제</button>
            </td>
        </tr>
    );
};

export default TableRow;
