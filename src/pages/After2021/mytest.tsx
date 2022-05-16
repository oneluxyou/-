import React, { useState, useRef } from "react";
import Edit from 'Edit'
import { ActionType } from "@ant-design/pro-table";

const Index = () => {
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)
  const [isShowModalEdit] = useState(false)
  const actionRef = useRef<ActionType>();
  const isMo
  return (
    <Edit
      isModalVisible={isModalVisibleEdit}
      isShowModal={isShowModalEdit}
      actionRef={actionRef}
    />
  )


}
