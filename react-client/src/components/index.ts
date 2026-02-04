import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Note from "@/assets/note.svg?react"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"

export const navigationVM = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Note, label: "All Articles", href: "/articles" },
  { icon: Important, label: "About", href: "/about" },
  { icon: Heart, label: "Support us", href: "/support" },
  { icon: Comment, label: "Community", href: "/community" },
]
