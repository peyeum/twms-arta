import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getTimeGuidePosition } from "../../app/helper"

export default function TimeGuide({widthTolerance, ...rest}) {
  const [linePosition, setLinePosition] = useState(0)
  const lineWidth = 2 // in px
  const linePos = `${linePosition}%` // in percantage
  const widthSpacing = 0.5 // in px
  useEffect(() => {
    setLinePosition(getTimeGuidePosition())
    const timeGuideTimer = setInterval(() => {
      setLinePosition(getTimeGuidePosition())
    }, 1000 * 60 * 1);
  
    return () => clearInterval(timeGuideTimer)
  }, [])
  
  setInterval(() => {
    setLinePosition(getTimeGuidePosition())
  }, 1000 * 60 * 15);

  return (
    <Box
      pos='absolute'
      h='full'
      left={widthTolerance + widthSpacing + 'px'}
      right={widthSpacing + 'px'}
      pointerEvents='none'
      {...rest}
    >
      <Box
        h='full'
        w={lineWidth + 'px'}
        bgGradient='repeating-linear-gradient(to-b, blackAlpha.900, blackAlpha.900 5px, whiteAlpha.50 5px, whiteAlpha.50 10px)'
        marginLeft={linePos}
      >
      </Box>
    </Box>
  )
}
