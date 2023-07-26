"use client"
import { Modal } from "@/components/ui/modal";
import dynamic from "next/dynamic";

const SetUpPage = () => {
  return (
    <div>
      <Modal title="Test" description="Test description" isOpen onClose={()=>{}}>
        Children
      </Modal>
    </div>
  )
}

export default dynamic (() => Promise.resolve(SetUpPage), {ssr: false})