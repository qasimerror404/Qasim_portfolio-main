// @flow strict
'use client';

import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  // Ensure no null values on fields we read
  const safeData = {
    published_at: blog?.published_at || new Date().toISOString(),
    title: blog?.title || 'Untitled Blog Post',
    url: blog?.url || '#',
    description: blog?.description || 'No description available',
    reading_time_minutes: blog?.reading_time_minutes || 0,
    public_reactions_count: blog?.public_reactions_count || 0,
    comments_count: blog?.comments_count || 0,
    cover_image: blog?.cover_image || '/placeholder.jpg'
  };

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group">
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        <Image
          src={safeData.cover_image}
          height={1080}
          width={1920}
          alt={safeData.title}
          className='h-full w-full group-hover:scale-110 transition-all duration-300'
        />
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{timeConverter(safeData.published_at)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{safeData.public_reactions_count}</span>
            </p>
            {safeData.comments_count > 0 &&
              <p className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{safeData.comments_count}</span>
              </p>
            }
          </div>
        </div>
        <Link target='_blank' href={safeData.url}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {safeData.title}
          </p>
        </Link>
        <p className='mb-2 text-sm text-[#16f2b3]'>
          {`${safeData.reading_time_minutes} Min Read`}
        </p>
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {safeData.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;