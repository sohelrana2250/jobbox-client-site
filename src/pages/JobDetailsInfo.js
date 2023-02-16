import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplyJobMutation, useGetJobByIdQuery, useQuestionsMutation, useReplyMutation } from '../features/api/apiSlice';
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


const JobDetailsInfo = () => {

    const { id } = useParams();
    const { data } = useGetJobByIdQuery(id);
    const { user } = useSelector((state) => state.auth);
    const naviage = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [reply, setReply] = useState();
    const {
        companyName,
        position,
        location,
        experience,
        workLevel,
        employmentType,
        salaryRange,
        skills,
        requirements,
        responsibilities,
        overview,
        queries,
        _id

    } = data?.data || {};

    console.log(data?.data);

    const [apply] = useApplyJobMutation();






    // console.log(experience);
    // console.log(workLevel);
    // console.log(employmentType);
    // console.log(salaryRange);

    const handelApply = () => {

        if (!user?.role === 'employer') {
            alert('you needed a candeaid account');
            return;
        }
        if (user?.role === "") {
            naviage('/register');
        }

        const data = {
            userId: user?._id,
            email: user?.email,
            jobId: _id
        }

        // console.log(data);
        apply(data);


    }


    const [sendQuestions] = useQuestionsMutation();

    const handelQuestions = (data) => {
        console.log(data);
        sendQuestions({ ...data, userId: user?._id, email: user?.email, jobId: _id })
        reset();
    }

    //employer-replay-section

    const [questionReply] = useReplyMutation();
    const handelReply = (id) => {

        const data = {
            reply,
            userId: id
        }

        console.log(data);
        questionReply(data);



    }




    return (
        <div className='p-5'>

            <div className='pt-2 grid grid-cols-12 gap-5'>
                <div className='col-span-9 mb-10'>
                    <div className='h-80 rounded-xl overflow-hidden'>
                        <img className='h-full w-full object-cover' src={meeting} alt='' />
                    </div>
                    <div className='space-y-5'>
                        <div className='flex justify-between items-center mt-5'>
                            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
                            <button className='btn' onClick={handelApply}>Apply</button>
                            <button className='btn'>HomePage</button>
                        </div>


                        <div>
                            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
                            <p>{overview}</p>
                        </div>
                        <div>
                            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
                            <ul>
                                {skills?.map((skill, index) => (
                                    <li key={index} className='flex items-center'>
                                        <BsArrowRightShort /> <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-primary text-lg font-medium mb-3'>
                                Requirements
                            </h1>
                            <ul>
                                {requirements?.map((skill, index) => (
                                    <li key={index} className='flex items-center'>
                                        <BsArrowRightShort /> <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-primary text-lg font-medium mb-3'>
                                Responsibilities
                            </h1>
                            <ul>
                                {responsibilities?.map((skill, index) => (
                                    <li key={index} className='flex items-center'>
                                        <BsArrowRightShort /> <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr className='my-5' />
                    <div>
                        <div>
                            <h1 className='text-xl font-semibold text-primary mb-5'>
                                General Q&A
                            </h1>
                            <div className='text-primary my-2'>
                                {queries?.map(({ question, email, reply, id }) => (
                                    <div>
                                        <small>{email}</small>
                                        <p className='text-lg font-medium'>{question}</p>
                                        {reply?.map((item) => (
                                            <p className='flex items-center gap-2 relative left-5'>
                                                <BsArrowReturnRight /> {item}
                                            </p>
                                        ))}

                                        <div className='flex gap-3 my-5'>
                                            <input placeholder='Reply' type='text' className='w-full' onBlur={(e) => setReply(e.target.value)} />
                                            <button
                                                className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                                type='submit'
                                                onClick={() => handelReply(id)}
                                            >
                                                <BsArrowRightShort size={30} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit(handelQuestions)}>

                                <div className='flex gap-3 my-5'>
                                    <input
                                        placeholder='Ask a question...'
                                        type='text'
                                        className='w-full'
                                        name='question'
                                        {...register('question')}
                                    />
                                    <button
                                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                        type='submit'
                                    >
                                        <BsArrowRightShort size={30} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                <div className='col-span-3'>
                    <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
                        <div>
                            <p>Experience</p>
                            <h1 className='font-semibold text-lg'>{experience}</h1>
                        </div>
                        <div>
                            <p>Work Level</p>
                            <h1 className='font-semibold text-lg'>{workLevel}</h1>
                        </div>
                        <div>
                            <p>Employment Type</p>
                            <h1 className='font-semibold text-lg'>{employmentType}</h1>
                        </div>
                        <div>
                            <p>Salary Range</p>
                            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
                        </div>
                        <div>
                            <p>Location</p>
                            <h1 className='font-semibold text-lg'>{location}</h1>
                        </div>
                    </div>
                    <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
                        <div>
                            <h1 className='font-semibold text-lg'>{companyName}</h1>
                        </div>
                        <div>
                            <p>Company Size</p>
                            <h1 className='font-semibold text-lg'>Above 100</h1>
                        </div>
                        <div>
                            <p>Founded</p>
                            <h1 className='font-semibold text-lg'>2001</h1>
                        </div>
                        <div>
                            <p>Email</p>
                            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
                        </div>
                        <div>
                            <p>Company Location</p>
                            <h1 className='font-semibold text-lg'>Los Angeles</h1>
                        </div>
                        <div>
                            <p>Website</p>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default JobDetailsInfo;