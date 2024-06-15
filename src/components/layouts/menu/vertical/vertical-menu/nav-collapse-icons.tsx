import useVerticalNav from '@/utils/hooks/use-vertical-nav'
import { HTMLAttributes, ReactElement } from 'react'
import CloseIcon from '@/assets/svg/close'
import RadioCircleIcon from '@/assets/svg/radio-circle'
import RadioCircleMarkedIcon from '@/assets/svg/radio-circle-marked'

type NavCollapseIconsProps = HTMLAttributes<HTMLSpanElement> & {
  closeIcon?: ReactElement
  lockedIcon?: ReactElement
  unlockedIcon?: ReactElement
  onClick?: () => void
  onClose?: () => void
}

const NavCollapseIcons = (props: NavCollapseIconsProps) => {
  // Props
  const { closeIcon, lockedIcon, unlockedIcon, onClick, onClose, ...rest } = props

  // Hooks
  const { isCollapsed, collapseVerticalNav, isBreakpointReached, toggleVerticalNav } = useVerticalNav()

  // Handle Lock / Unlock Icon Buttons click
  const handleClick = (action: 'lock' | 'unlock') => {
    // Setup the verticalNav to be locked or unlocked
    const collapse = action === 'lock' ? false : true

    // Tell the verticalNav to lock or unlock
    collapseVerticalNav(collapse)

    // Call onClick function if passed
    onClick && onClick()
  }

  // Handle Close button click
  const handleClose = () => {
    // Close verticalNav using toggle verticalNav function
    toggleVerticalNav(false)

    // Call onClose function if passed
    onClose && onClose()
  }

  return (
    <>
      {isBreakpointReached ? (
        <span role='button' tabIndex={0} style={{ display: 'flex', cursor: 'pointer' }} onClick={handleClose} {...rest}>
          {closeIcon ?? <CloseIcon />}
        </span>
      ) : isCollapsed ? (
        <span
          role='button'
          tabIndex={0}
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => handleClick('lock')}
          {...rest}
        >
          {unlockedIcon ?? <RadioCircleIcon />}
        </span>
      ) : (
        <span
          role='button'
          tabIndex={0}
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => handleClick('unlock')}
          {...rest}
        >
          {lockedIcon ?? <RadioCircleMarkedIcon />}
        </span>
      )}
    </>
  )
}

export default NavCollapseIcons
