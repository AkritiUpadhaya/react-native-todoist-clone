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

       <DropdownMenu.Group>
        
       <DropdownMenu.Item key='select'>
        <DropdownMenu.ItemTitle>Select</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemIcon
        ios={{
          name:'square.stack',
          pointSize:24
        }}
        ></DropdownMenu.ItemIcon>
       </DropdownMenu.Item>


       <DropdownMenu.Item key='view'>
        <DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemIcon
        ios={{
          name:'slider.horizontal.3',
          pointSize:24
        }}
        ></DropdownMenu.ItemIcon>
       </DropdownMenu.Item>

       <DropdownMenu.Item key='activity'>
        <DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemIcon
        ios={{
          name:'chart.xyaxis.line',
          pointSize:24
        }}
        ></DropdownMenu.ItemIcon>
       </DropdownMenu.Item>

       </DropdownMenu.Group>



      </DropdownMenu.Content>
    </DropdownMenu.Root>
    </>  )
}

export default MoreButton
