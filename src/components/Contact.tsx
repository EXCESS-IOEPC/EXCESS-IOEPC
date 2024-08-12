import React from 'react'
const About = () => {
  return (   
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-primaryBlue">Visit Us</h2>
              <p className="mt-4 text-md text-offBlack">We value your input and are eager to assist you. Get in touch with us today!</p>
          </div>
          <div className="mt-16 lg:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-lg overflow-hidden">
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.338294616256!2d87.29291177150257!3d26.792692998930214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b606ce89f9%3A0x7423e72f8e139e05!2sPurwanchal%20Engineering%20Campus(ERC)!5e0!3m2!1sen!2snp!4v1722341790284!5m2!1sen!2snp"
                          width="100%" height="480" loading="lazy">  
                      </iframe>
                  </div>
                  <div>
                      <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                          <div className="px-6 py-4">
                              <h3 className="text-lg   text-primaryBlue">Our Address</h3>
                              <p className="mt-1 text-sm text-offBlack">56700, Gangalal Marga-Tinkune, Dharan-8 <br /> Sunsari Koshi Province, Nepal</p>
                          </div>
                          <div className="border-t border-primaryBlue px-6 py-4">
                              <h3 className="text-lg   text-primaryBlue">Mail</h3>
                              <p className="mt-1 text-sm text-offBlack">xtech@ioepc.edu.np</p>
                              <p className="mt-1 text-sm text-offBlack">excessnepal@ioepc.edu.np</p>
                          </div>
                          <div className="border-t border-primaryBlue px-6 py-4">
                              <h3 className="text-lg   text-primaryBlue">Contact</h3>
                              <p className="mt-1 text-sm text-offBlack">Mahesh Chaudhary: +977 9809574797</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    )
}

export default About