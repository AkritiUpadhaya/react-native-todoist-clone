  import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { toast } from 'sonner-native'
import * as DropdownMenu from 'zeego/dropdown-menu'
type MoreButtonProps = {
    pageName:string
}

const MoreButton = ({pageName}:MoreButtonProps) => {

  const copyToClipboard =async () => {
    const path = `todoist://(auth)/(tabs)/${pageName.toLowerCase()}`
    await Clipboard.setStringAsync(path)
    toast.success('Copied to clipboard')
    console.log("running")
  }

  
  return (
    <>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-outline" size={30} color="blue" />
        </TouchableOpacity>
      </DropdownMenu.Trigger> 

      <DropdownMenu.Content>
       <DropdownMenu.Item onSelect={copyToClipboard} key='link'>
        <DropdownMenu.ItemTitle >Copy</DropdownMenu.ItemTitle>
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
