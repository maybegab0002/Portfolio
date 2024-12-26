import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

export default function useHorizontalScroll() {
  const scrollRef = useRef(null)

  useEffect(() => {
    let locomotiveScroll

    if (scrollRef.current) {
      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        direction: 'horizontal',
        multiplier: 0.5,
        class: 'is-revealed',
      })
    }

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy()
      }
    }
  }, [])

  return scrollRef
}
