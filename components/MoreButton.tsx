import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'

type MoreButtonProps = {
    pageName:string
}

const MoreButton = ({pageName}:MoreButtonProps) => {
  return (
    <>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity>
            <Text>{pageName}</Text>
        </TouchableOpacity>
      </DropdownMenu.Trigger> 

      <DropdownMenu.Content>
       <DropdownMenu.Item key='link'>
        <DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemIcon
        ios={{
          name:'link',
          pointSize:24
        }}
        ></DropdownMenu.ItemIcon>
       </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    </>  )
}

export default MoreButton
