import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import {
    createSubSection,
    updateSubSection,
} from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import Upload from '../CourseInformation/Upload'

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        if (view || edit) {
            setValue('lectureTitle', modalData.title)
            setValue('lectureDesc', modalData.description)
            setValue('lectureVideo', modalData.videoUrl)
        }
    }, [edit, modalData.description, modalData.title, modalData.videoUrl, setValue, view])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        } else {
            return false
        }
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append('sectionId', modalData.sectionId)
        formData.append('subSectionId', modalData._id)
        formData.append('courseId', course._id)

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append('title', currentValues.lectureTitle)
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append('description', currentValues.lectureDesc)
        }

        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append('video', currentValues.lectureVideo)
        }

        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
            dispatch(setCourse(result))
        }
        setModalData(null)
        setLoading(false)
    }

    const onSubmit = async (data) => {
        if (view) return

        if (edit) {
            if (!isFormUpdated()) {
                toast.error('No changes made to the form')
            } else {
                handleEditSubSection()
            }
            return
        }

        const formData = new FormData()
        formData.append('sectionId', modalData)
        formData.append('title', data.lectureTitle)
        formData.append('description', data.lectureDesc)
        formData.append('video', data.lectureVideo)
        formData.append('courseId', course._id)
        setLoading(true)
        // API CALL
        const result = await createSubSection(formData, token)

        if (result) {
            dispatch(setCourse(result))
        }
        setModalData(null)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : null)}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 px-8 py-10"
                >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register('lectureTitle', { required: true })}
                            className="form-style w-full"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    {/* Video Playback Time */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="videoPlaybackTime">
                            Video Playback Time {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <div className="flex justify-between gap-x-4">
                            <div className="flex flex-col space-y-1">
                                <input
                                    type="number"
                                    disabled={view || loading}
                                    id="hh"
                                    placeholder="HH"
                                    {...register('hh', { required: !view })}
                                    className="form-style w-full"
                                />
                                <span className="text-xs text-richblack-200">HH</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <input
                                    type="number"
                                    disabled={view || loading}
                                    id="mm"
                                    placeholder="MM"
                                    {...register('mm', { required: !view })}
                                    className="form-style w-full"
                                />
                                <span className="text-xs text-richblack-200">MM</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <input
                                    type="number"
                                    disabled={view || loading}
                                    id="ss"
                                    placeholder="SS"
                                    {...register('ss', { required: !view })}
                                    className="form-style w-full"
                                />
                                <span className="text-xs text-richblack-200">SS</span>
                            </div>
                        </div>
                        {(errors.hh || errors.mm || errors.ss) && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Video playback time is required
                            </span>
                        )}
                    </div>
                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                            Lecture Description{' '}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register('lectureDesc', { required: true })}
                            className="form-style min-h-[130px] w-full"
                        />
                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture description is required
                            </span>
                        )}
                    </div>
                    {!view && (
                        <div className="flex justify-end gap-x-3">
                            <button
                                type="button"
                                onClick={() => (!loading ? setModalData(null) : null)}
                                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-[8px] px-[20px] font-semibold text-richblack-5`}
                            >
                                Cancel
                            </button>
                            <IconBtn
                                disabled={loading}
                                text={loading ? 'Loading...' : edit ? 'Save Edits' : 'Save'}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
