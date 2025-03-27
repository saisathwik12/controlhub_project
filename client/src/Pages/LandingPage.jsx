import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/Data/features';
import { faqs } from '@/Data/Faqs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';



export const LandingPage = () => {
    return (
        <div className='w-full min-h-screen body-background'>
            {/* Hero Section */}
            <section className='text-center'>
                <h1 className='text-6xl sm:text-7xl lg:text-8xl font-extrabold py-10 pb-6 flex flex-col gradient-title text-center'>Refine Your Work Process <br />
                    <span className='flex flex-wrap justify-center mx-auto gap-3 sm:gap-4'>with
                        <img src="logos/title2.png" alt="logo" width={400} height={80} className='inline' />
                    </span>
                </h1>
                <p className='text-xl text-gray-200 max-wd-3xl'>Unlock your team's potential with our effortlessly simple project management solution.</p>
                <Link to="/log-in">
                    <Button size="lg" className=' mr-2 mt-10 cursor-pointer'>Get Started</Button>
                </Link>
                <a href="#features">
                    <Button size='lg' variant='outline' className='mt-10 text-black cursor-pointer'>Learn More</Button>
                </a>
            </section>
            <section>
                <div id='features' className='text-center border-blue-950 border-2 rounded-2xl mx-5 my-10 p-5 py-10'>
                    <h3 className='text-3xl font-extrabold my-5 mx-auto text-blue-300'>Key Features</h3>
                    <div className='flex flex-wrap justify-center gap-1'>
                        {features.map((data, index) => {
                            return (
                                <Card key={index} className='bg-gradient-to-bl from-blue-950 to-blue-800 text-gray-100 content-center max-w-100 m-2 p-5 border-0 hover:scale-105 duration-500'>
                                    <CardHeader className='flex flex-row text-center text-2xl'>
                                        <data.icon ></data.icon>
                                        <CardTitle >{data.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{data.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            {/* <section>
                <div id='features' className='text-center border-blue-950 border-2 rounded-2xl m-5 p-3'>
                    <h3 className='text-3xl font-bold my-5 mx-auto'>Trusted By Industry Leaders</h3>
                    <div >

                    </div>
                </div>
            </section> */}
            <section>
                <div id='features' className='text-center text-white border-blue-950 border-2 rounded-2xl m-5 p-5 py-10'>
                    <h3 className='text-3xl font-bold my-5 mx-auto '>Frequently Asked Questions</h3>
                    <div >
                        <Accordion type="single" collapsible className="text-2xl">
                            {faqs.map((data, index) => {
                                return (
                                    <AccordionItem value={`item-${index + 1}`} key={index} className="border-blue-950">
                                        <AccordionTrigger>{data.question}</AccordionTrigger>
                                        <AccordionContent>
                                            {data.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                </div>
            </section>

            <section className="sm:bg-none md:bg-[url(./Hero/shape-02.svg)] bg-left-bottom bg-no-repeat ">
                <div id='features' className='text-center border-blue-950 border-2 rounded-2xl p-10 text-white'>
                    <h3 className='text-3xl font-bold my-5 mx-auto'>Ready to Transform Your Workflow?</h3>
                    <p className='my-5 mb-10'>Join thousands of teams already using CONTROLHUB to streamline their projects and boost productivity.</p>
                    <Link to="/log-in">
                        <Button size="lg" className='animate-bounce '>
                            Start For Free <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    )
}